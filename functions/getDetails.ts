// import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
// import * as jwt from 'jsonwebtoken';
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()

// module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   var code: number = 500;
//   var data: Record<string, any> = { message: "Something went wrong!" };

//   try {
//     // const userr = {
//     //   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiZmZmZkBnbWFpbC5jb20iLCJpYXQiOjE2ODQ1NjA2Nzd9.ILB3GAB9AvlkZxMBScQdPl54vZaeoUuarUTMSeE5v6s"
//     // }
//     // const value = await GetDetails.validateAsync(event.body ? JSON.parse(event.body) : {});
//     const accessToken = event.headers['authorization'].split(' ')[1]

//     const result = jwt.verify(accessToken, "secret_key")

//     const user = await prisma.user.findFirstOrThrow({ where: { email_id: result.emailId } })

//     code = 200
//     data = {
//       name: user.name,
//       studentNumber: user.student_number,
//       emailId: user.email_id,
//       role: user.role
//     }
//   } catch (error) {
//     code = 400
//     data = {
//       message: error.message
//     }
//   }

//   return {
//     statusCode: code,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Credentials': true
//     },
//     body: data
//   }
// }