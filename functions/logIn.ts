import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import LogInSchema from '../schemas/logIn';
import * as jwt from 'jsonwebtoken';
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  var code: number = 500;
  var data: Record<string, string> = { message: "Something went wrong!" };

  try {
    const value = await LogInSchema.validateAsync(event.body ? JSON.parse(event.body) : {});

    const user = await prisma.user.findFirstOrThrow({ where: { email_id: value.emailId } })

    await compare(value.password, user.password)
      .then((result: Boolean) => {
        if (result) {
          const token = jwt.sign({ emailId: value.emailId }, "secret_key")
          if (token) {
            code = 200
            data = {
              access_token: token
            }
          } else {
            throw new Error("Token could not be generated!")
          }
        } else {
          throw new Error("Invalid Credentials!")
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
