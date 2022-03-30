import express, { application } from 'express'
import { readFile, writeFile } from 'fs'
import { database } from '../config/index.js'

const router = express.Router()

router.put('/mark-done/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: "failed", message: "Nepavyko perskaityti failo" })
            return
        }
        //issifruojame Json informacija atgal i javascript masyva
        let json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)
        if (jsonId === -1) {
            res.json({ status: "failed", message: "Nepavyko rasti tokio elemento" })
            return
        }
        //atstatymo eilute
        json[jsonId].done = json[jsonId].done ? false : true

        let jsonString = JSON.stringify(json)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: "failed", message: "Nepavyko perskaityti failo" })

            } else {
                res.json({ status: "success", message: "Užduotis atlikta" })
            }
        })
    })
})

router.put('/edit-todo/:id', (req, res) => {
    let id = req.params.id
    let task = req.body.task

    if (task === undefined) {
        res.json({ status: "failed", message: "Neįvesta tekstas" })
        return
    }


    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.json({ status: "failed", message: "Nepavyko perskaityti failo" })
            return
        }
        //issifruojame Json informacija atgal i javascript masyva
        let json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)
        if (jsonId === -1) {
            res.json({ status: "failed", message: "Nepavyko rasti tokio elemento" })
            return
        }

        json[jsonId].task = task

        let jsonString = JSON.stringify(json)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.json({ status: "failed", message: "Nepavyko perskaityti failo" })

            } else {
                res.json({ status: "success", message: "Įrašas paredaguotas" })
            }
        })
    })
})


export default router