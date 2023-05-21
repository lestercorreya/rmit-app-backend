import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { hash } from "bcrypt";
import SignInSchema from '../schemas/signIn'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type UserDetails = {
  name: string,
  emailId: string,
  studentNumber: number,
  password: string
}

const addUserToDatabase = async (userDetails: UserDetails) => {
  const user = {
    name: userDetails.name,
    email_id: userDetails.emailId,
    student_number: userDetails.studentNumber,
    password: userDetails.password
  }
  await prisma.user.create({ data: user })
}

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  var code: number = 500;
  var data: Record<string, string> = {
    message: "Something went wrong!"
  };

  try {
    const value = await SignInSchema.validateAsync(event.body ? JSON.parse(event.body) : {});

    const user = await prisma.user.findFirst({ where: { email_id: value.emailId } })

    if (user) {
      throw new Error("User with this emailId already exists!")
    } else {
      await hash(value.password, 10)
        .then(async (hash: string) => {
          value.password = hash
          await addUserToDatabase(value)

          code = 200
          data = {
            message: "User SignIn Successfully!"
          }
        })
        .catch((error: Error) => {
          throw error
        })
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
