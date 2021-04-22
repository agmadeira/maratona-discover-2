
const Job = require('../model/job.js')
const JobUtils = require('../utils/jobUtils.js')
const Profile = require('../model/profile.js')


module.exports = {
    
    async index(req, res) {
        
        const jobs = await Job.get()
        const profile = await Profile.get()
        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        //total de hotas por dia de cada job em andamento
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            //map = itera em todos os itens do array
            //para cada job, realiza ajustes
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            
            statusCount[status] += 1 
            
            //if(status == 'progress'){
            //    jobTotalHours += Number(job["daily-hours"])
            //}
            
            //mesma operação acima, porém usando TERNÁRIO:
            jobTotalHours = status == "progress" ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        //calcula horas livres
        
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours} )

    }

}


