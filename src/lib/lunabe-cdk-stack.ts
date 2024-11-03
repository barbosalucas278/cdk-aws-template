import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class LunabeCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    const enviroment = process.env.ENV_VAR;
    console.log(`${id + enviroment}`);
    
    super(scope, `${id + enviroment}`, props);
    if(!enviroment) throw new Error("Falta variable de entorno ENV_VAR")
    // DynamoDB
    new dynamodb.Table(this, `lunabe-accounting-dynamodb-${enviroment}`, {
      partitionKey:{
        name: "id",
        type: dynamodb.AttributeType.STRING
      },
      tableName:`lunabe-accounting-dynamodb-${enviroment}`
    })
    // Lambdas
    new lambda.Function(this, `Lunabe.HelloLambdaHandler.${enviroment}`, {
      runtime: lambda.Runtime.NODEJS_20_X, // Elige la runtime que necesites
      code: lambda.Code.fromAsset("dist/lambdas/hello-world"), // Carpeta donde está tu código
      handler: "index.handler", // Nombre del archivo y del handler
      functionName:`Lunabe-HelloLambdaHandle-${enviroment}`
    });
  }
}