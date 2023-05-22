import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PrismaClient } from "@prisma/client";
import ValidateSchema from '../schemas/validate'

const prisma = new PrismaClient()

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  var code: number = 500;
  var data: Record<string, string> = { message: "Something went wrong!" };

  try {
    const value = await ValidateSchema.validateAsync(event.body ? JSON.parse(event.body) : {});

    const certificate = await prisma.certificate.findFirst({ where: { certificate_id: value.certificateId } })

    if (certificate) {
      code = 200
      data = {
        url: certificate.url
      }
    } else {
      throw new Error("Entered Certificate Id is invalid!")
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