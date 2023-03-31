'use strict'

let Project = require('../models/project')
var fs = require('fs');
var path = require('path');

let controller = {
    home: function(req, res){
        return res.status(200).send({
            message:'Home'
        })
    },
    test : function(req, res){
        return res.status(200).send({
            message:'Test'
        })
    },
	saveProject: function(req, res){
		let project = new Project();

		let params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		project.save().then((projectStored) => {
			return res.status(200).send({project: projectStored});
		}).catch((err)=>{
			return res.status(500).send({message: 'Error al guardar el documento.'});
		});
	},

	getProject: function(req,res){
		let projectId = req.params.id;
		if(projectId==null)return res.status(404).send({message: 'El proyecto no existe.'});

		Project.findById(projectId).then((project)=>{
			return res.status(200).send({project});
		}).catch((err)=>{
			return res.status(500).send({message: 'Error al devolver datos.'});
		})
	},

	getProjects: function(req,res){
		Project.find({}).then((project)=>{
			return res.status(200).send({project});
		}).catch((err)=>{
			return res.status(500).send({message: 'Error al devolver datos.'});
		})
	},
	updateProject: function(req,res){
		let projectId = req.params.id;
		let update = req.body;

		Project.findByIdAndUpdate(projectId, update, {new: true})
		.then((updatedProject)=> {
		  if (!updatedProject) {
			return res.status(404).send({message: 'Project not found.'});
		  }
		  return res.status(200).send({project: updatedProject});
		})
		.catch((err) => {
		  console.error(err);
		  return res.status(500).send({message: 'Error updating project.'});
		});
	  
	},
	    deleteProject: function(req,res){
		let projectId = req.params.id;

		Project.findByIdAndDelete(projectId)
		.then((deleteProject)=> {
		  if (!deleteProject) {
			return res.status(404).send({message: 'Project not found.'});
		  }
		  return res.status(200).send({message:'Borrado'});
		})
		.catch((err) => {
		  console.error(err);
		  return res.status(500).send({message: 'Error deleting project.'});
		});
	  
	},

	uploadImage: function (req,res){
		let projectId = req.params.id;
		let fileName = 'Imagen no subida..';

		if(req.files) {
			let filePath = req.files.image.path;
			let fileSplit = filePath.split('\\');
			let fileName = fileSplit[1];
			let extSplit = fileName.split('\.');
			let fileExt = extSplit[1];
			if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
				Project.findByIdAndUpdate(projectId,{image:fileName})
				.then((projectUpdate)=> {
				  if (!projectUpdate) {
					return res.status(404).send({message: 'Project no found.'});
				  }
				  return res.status(200).send({files:fileName});
				})
				.catch((err) => {
				  console.error(err);
				  return res.status(500).send({message: 'Error Subiendo Imagen.'});
				});
			}else{
				fs.unlink(filePath, (err)=>{
					return res.status(200).send({message:'Extension no valida'})
				})
			}  
	}else 
	{
			return res.status(200).send({message : fileName})}
	},

	getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}
	
}

module.exports = controller;