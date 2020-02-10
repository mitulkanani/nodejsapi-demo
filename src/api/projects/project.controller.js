const { CreateProject, GetProjects } = require('./project.service');
const { CREATED, OK } = require('../../utils/http-status');
const { UploadFile } = require('../../utils/helper');
const APIError = require('../../utils/APIErrors');

exports.create = async (req, res, next) => {
  try {
    if (req.files === null) {
      throw new APIError({ message: 'Attachment is require', status: 400 });
    }
    req.body.attachment = await UploadFile(req.files.attachment);
    req.body.user = req.user.id;
    const data = await CreateProject(req.body);
    res.status(CREATED).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const data = await GetProjects();
    res.status(OK).json({ data });
  } catch (err) {
    next(err);
  }
};
