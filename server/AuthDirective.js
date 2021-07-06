import {
  AuthenticationError,
  SchemaDirectiveVisitor,
} from "apollo-server-express";
import { defaultFieldResolver } from "graphql";

const assertOwner = (typename, user, data) => {
  console.log(user.id, data.receiverId);
  if (typename === "Message" && user.id !== data.receiverId) {
    throw new AuthenticationError("You need to be the receiver of the message");
  }
};
class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const requiredRole = this.args.requires;
    const originalResolve = field.resolve || defaultFieldResolver;
    const test = this;
    field.resolve = async function (...args) {
      console.log(requiredRole);
      const context = args[2];
      const user = context.user || {};
      const requiresOwner = requiredRole === "OWNER";
      const isUnauthorized = !requiresOwner && user.role !== requiredRole;
      // add admin watch measages
      if (isUnauthorized && !user.role == "ADMIN") {
        throw new AuthenticationError(
          `You need following role: ${requiredRole}`
        );
      }

      const data = await originalResolve.apply(this, args);

      if (requiresOwner) {
        assertOwner(field.type.name, user, data);
      }
      return data;
    };
  }
}
export default AuthDirective;
