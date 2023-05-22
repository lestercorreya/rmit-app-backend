import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PrismaClient } from "@prisma/client";
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  var code: number = 500;
  var data: Record<string, any> = { message: "Something went wrong!" };

  try {
    const accessToken = event.headers['Authorization'].split(' ')[1]

    const result = jwt.verify(accessToken, "secret_key")

    const user = await prisma.user.findFirstOrThrow({ where: { email_id: result.emailId } })

    if (user.role == "student") {
      const certificates = await prisma.certificate.findMany({ where: { email_id: result.emailId } })
      code = 200
      data = {
        name: user.name,
        role: user.role,
        certificates: certificates.map((certificate) => certificate.url)
      }
    } else {
      const users = await prisma.user.findMany({
        // @ts-ignore
        include: {
          Certificate: {
            select: {
              url: true
            }
          }
        },
        where: {
          role: "student"
        }
      });
      code = 200
      data = {
        name: user.name,
        role: user.role,
        students: users.map((student) => ({ name: student.name, certificates: student.Certificate.map(certificate => certificate.url) }))
      }
    }
  } catch (error) {
    code = 400
    data = {
      message: error.message
    }
  }

  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(data)
  }
}