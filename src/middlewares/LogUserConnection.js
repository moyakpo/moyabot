const LogActivity = async (ctx, next) => {
    await next()
    ctx.session.LastConnection = Date.now()
};

export default LogActivity