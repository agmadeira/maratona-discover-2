const profile = require('../model/profile.js')

module.exports = {
        
    async index(req, res) {
        return res.render("profile", {profile: await profile.get()})
    },

    
    async update(req, res) {

        //req.body para pegar os dados
        const data = req.body
        //definir quantas semandas tem um ano: 52
        const weeksPerYear = 52
        // remover as semanas de férias do ano
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        //quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //total de horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
        //valor da minha hora
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        const Profile = await profile.get()

        profile.update({
            ...Profile,
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect('/profile')

    }

}