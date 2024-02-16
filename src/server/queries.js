import HttpError from '@wasp/core/HttpError.js'

export const getUser = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { tasks: true }
  });
}

export const getTasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Task.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}