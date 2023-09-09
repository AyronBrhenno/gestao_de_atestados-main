const config = require('../database/config/config');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
    dialect: 'postgres' // Adicione esta linha para especificar o dialeto
});
const medicoModel = require('../database/models/medicomodel')(sequelize, DataTypes);
const atestadoModel = require('../database/models/atestadomodel')(sequelize, DataTypes);
const db = require('../database/models');
class AtestadoController {
    async store (req,res) {
        try {
            const {medicoFK, pacienteFK, dataConsulta, horaInicioConsulta, horaFimConsulta, dispensaAlgorismo, dispensaExtenso, cid } = req.body;
            const novoAtestado = await atestadoModel.create({
                medicoFK: medicoFK,
                pacienteFK: pacienteFK,
                dataConsulta: dataConsulta,
                horaInicioConsulta: horaInicioConsulta,
                horaFimConsulta: horaFimConsulta,
                dispensaAlgorismo: dispensaAlgorismo,
                dispensaExtenso: dispensaExtenso,
                cid: cid
            });
            res.status(201).json({ mensagem: 'Atestado cadastrado com sucesso!', nome: novoAtestado });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'Ocorreu um erro ao cadastrar o atestado.' });
        }
    }

    async show (req,res) {
        try {
            const atestado = await atestadoModel.findAll({
                include: [{model: medicoModel,     
                where: { rg: db.sequelize.col('atestadoModel.medicoFK') }}],// Equivalente a "medicoFK = rg"}]
            });
            res.status(200).json(atestado);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'Ocorreu um erro ao buscar os atestados.' });
        }
    }
    async showOnly (req,res) {
        try {
            const {coluna, ordem, dado} = req.body;
            const paciente = await atestadoModel.findAll({
                where: {[coluna]: dado},
                order:[ [ordem, 'DESC'] ]
            });
            res.status(200).json(paciente);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'Ocorreu um erro ao buscar os pacientes.' });
        }
    }

    async update (req,res) {
        try {
            const {medicoFK, pacienteFK, dataConsulta, horaInicioConsulta, horaFimConsulta, dispensaAlgorismo, dispensaExtenso, cid} = req.body;
            const atualizar = await atestadoModel.findByPk(req.params.id);
            if(medicoFK){
                atualizar.medicoFK = medicoFK;
            }
            if(pacienteFK){
                atualizar.pacienteFK = pacienteFK;
            }
            if(dataConsulta){
                atualizar.dataConsulta = dataConsulta;
            }
            if(horaInicioConsulta){
                atualizar.horaInicioConsulta = horaInicioConsulta;
            }
            if(horaFimConsulta){
                atualizar.horaFimConsulta = horaFimConsulta;
            }
            if(dispensaAlgorismo){
                atualizar.dispensaAlgorismo = dispensaAlgorismo;
            }
            if(dispensaExtenso){
                atualizar.dispensaExtenso = dispensaExtenso;
            }
            if(cid){
                atualizar.cid = cid;
            }
            await atualizar.save();
            res.status(201).json({ mensagem: 'Atestado atualizado com sucesso!', atestadoModel: atualizar });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'Ocorreu um erro ao atualizar atestado.' });
        }
    }
    async delete (req,res) {
        try {
            const atestado = await atestadoModel.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(`${atestado} atestado excluido com sucesso! `);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'Ocorreu um erro ao excluir atestado.' });
        }
    }
}

module.exports = new AtestadoController();
