import {
  ZodTypeAny,
  ZodObject,
  ZodString,
  ZodNumber,
  ZodBoolean,
  ZodArray,
  ZodOptional,
  ZodNullable,
  ZodEffects,
} from "zod";

type OpenAPISchema = {
  type?: string;
  properties?: Record<string, OpenAPISchema>;
  items?: OpenAPISchema;
  required?: string[];
  enum?: string[];
  format?: string;
  description?: string;
};

const zodToOpenAPI = (schema: ZodTypeAny): OpenAPISchema => {
  if (schema instanceof ZodString) {
    return { type: "string" };
  }

  if (schema instanceof ZodNumber) {
    return { type: "number" };
  }

  if (schema instanceof ZodBoolean) {
    return { type: "boolean" };
  }

  if (schema instanceof ZodArray) {
    return { type: "array", items: zodToOpenAPI(schema.element) };
  }

  if (schema instanceof ZodObject) {
    const properties: Record<string, OpenAPISchema> = {};
    const required: string[] = [];

    const shape = schema.shape as Record<string, ZodTypeAny>;

    for (const [key, value] of Object.entries(shape)) {
      properties[key] = zodToOpenAPI(value);

      if (!(value instanceof ZodOptional) && !(value instanceof ZodNullable)) {
        required.push(key);
      }
    }

    return {
      type: "object",
      properties,
      required: required.length ? required : undefined,
    };
  }

  if (schema instanceof ZodOptional || schema instanceof ZodNullable) {
    return zodToOpenAPI(schema.unwrap());
  }

  if (schema instanceof ZodEffects) {
    return zodToOpenAPI(schema.innerType());
  }

  throw new Error(`Unsupported Zod type: ${schema.constructor.name}`);
};

export default zodToOpenAPI;
