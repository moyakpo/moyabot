const Composer = require('telegraf/composer')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')


const stepHandler = new Composer()
stepHandler.action('next', (ctx) => {
    console.log('Step 2. Via ilnine button => next')
    ctx.wizard.state.data = {}
    ctx.reply('Mandá el legajo')
    return ctx.wizard.next()
})

stepHandler.action('nope', (ctx) => {
    console.log('Step 2. Via ilnine button => nope')
    ctx.reply('Bueno, en otro momento será')
    return;
})
stepHandler.command('/login', (ctx) => {
    console.log('Step 2. Via command. ')
    ctx.wizard.state.data = {}
    ctx.reply('Mandá el legajo')
    return ctx.wizard.next()
})
stepHandler.use((ctx) => ctx.replyWithMarkdown(`Tenes que iniciar sesion para continuar. 
Escribí o usá el comando /login para empezar`))

const superWizard = new WizardScene('login-wizard',
    (ctx) => {

        ctx.reply('Iniciar sesion con usuario de windows', Markup.inlineKeyboard([
            Markup.callbackButton('Dale', 'next'),
            Markup.callbackButton('En otro momento', 'nope')
        ]).extra())
        return ctx.wizard.next()
    },
    stepHandler,
    (ctx) => {
        ctx.wizard.state.data.legajo = ctx.update.message.text;

        ctx.reply('Mandá la contraseña')
        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.wizard.state.data.pass = ctx.update.message.text;
        if (ValidateUser(ctx)) {
            const user = RegirarUser(ctx.wizard.state.data.legajo, ctx.chat, ctx.message.from)
            ctx.session.LogedUser = {}
            ctx.session.LogedUser.id = user.id
            ctx.reply('Listo, ya podés usar el bot')
        } else {
            ctx.reply('Usuario y/o contraseñas incorrecto')
        }


        return ctx.scene.leave()
    }
)
const stage = new Stage([superWizard])

function ValidateUser(ctx) {
    //TODO: validar contra el AD
    return ctx.wizard.state.data.legajo == "L0" && ctx.wizard.state.data.pass == "lele";
}

function RegirarUser(User, chat, TelegramUser) {
    const user = {
        TelegramUser: TelegramUser,
        chat: chat,
        legajo: User,
        displayName: "",
        level: 0,
    };
    user.id = 'oinfewoin8qw3p49rc8nqp932rb8qo23rsm9p'
    return user;
    //TODO: Registrar en la base
    //database.add(user, "users");
    //db.get("users")
}

export default stage