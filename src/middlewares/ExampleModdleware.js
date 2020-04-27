const Example = async (ctx, next) => {
    await next(); // para que siga la ejecucion de la llamada se debe invocar al next()
    /*
        Codigo para hacer en el middleware
    */
}


export default Example