import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PrismaClient } from "@prisma/client";
import * as jwt from 'jsonwebtoken';
import { hash } from "bcrypt";

const prisma = new PrismaClient()

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  var code: number = 500;
  var data: Record<string, string> = { message: "Something went wrong!" };

  try {
    const url = "https://rmit-app.s3.ap-southeast-2.amazonaws.com/alex-g.jpg"
    const certificate_id = "uq135790"
    const email_id = "alex@gmail.com"
    const user = {
      name: "root",
      email_id: "root@gmail.com",
      student_number: 1234567,
      password: "root",
      role: "admin"
    }
    await hash(user.password, 10)
      .then(async (hash: string) => {
        user.password = hash
        await prisma.user.create({ data: user })
        code = 200
        data = {
          message: "User SignIn Successfully!"
        }
      })
      .catch((error: Error) => {
        throw error
      })
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