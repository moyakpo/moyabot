import database from "../DB/database";

const db = database.GetConnection();
const CheckAccess = async (ctx, next) => {
  if (!ctx.session.LogedUser) {
    console.log('scene => ', ctx.scene)
    await ctx.scene.enter('login-wizard')
  } else {
    await next()
  }
};

export default CheckAccess
