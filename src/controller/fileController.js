const fileData = require('../data.json')
const shortId = require('shortid')



//--------------------------------------------------------------------------//

const createFile = function (req, res) {
    try {
        const data = req.body
        const { fileName, fileSize, fileType } = data
        const checkBody = Object.keys(data)
        if (checkBody.length == 0) { return res.status(400).send({ status: false, msg: "Please provide File Info" }) }

        if (!fileName) { return res.status(400).send({ status: false, msg: "Please provide File Name" }) }

        if (!fileSize) { return res.status(400).send({ status: false, msg: "Please provide File Size" }) }

        if (!fileType) { return res.status(400).send({ status: false, msg: "Please provide File Type" }) }


        //-------- checking  dupllicateFileName-------------//

        for (let iterator in fileData) {
            if (fileData[iterator].fileName == fileName) { return res.status(409).send({ status: false, msg: "FileName is already exist" }) }

        }
        //----------- Generate UniqueId -----------------//

        const ID = shortId.generate()

        const newData = { id: ID, fileName: fileName, fileType: fileType, fileSize: fileSize }
        fileData[`${ID}`] = newData

        return res.status(201).send({ status: true, data: newData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err })
    }
}

//--------------------------------- Get All Files --------------------------------------------------//

const getAll = function (req, res) {
    try {
        return res.status(200).send({ status: true, data: fileData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err })
    }
}

//-------------------------------- Get By Name ----------------------------------------//

const getByName = function (req, res) {
    try {
        const fileName = req.params.fileName
        let foundData = ""
        for (let iterator in fileData) {
            if (fileData[iterator].fileName == fileName) {
                foundData = fileData[iterator]


            }
        }
        if (foundData) {
            return res.status(200).send({ status: true, data: foundData })
        } else {
            return res.status(404).send({ status: false, msg: "No File Found" })
        }

    } catch (err) {
        return res.status(500).send({ status: false, msg: err })
    }
}

//--------------------- delete File -------------------//

const deleteFile = function (req, res) {
    try {
        const fileId = req.params.fileId
        let foundData = ""
        for (let iterator in fileData) {
            if (fileData[iterator].id == fileId) {
                foundData = fileData[iterator]
                delete fileData[iterator]

            }
        }
        if (!foundData) { return res.status(404).send({ status: false, msg: " File Not Found" }) }
        return res.status(200).send({ status: true, msg: "File has been Deleted" })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err })
    }
}
//---------------- Update File ---------------------//

const updateFile = function (req, res) {
    try {
        const fileId = req.params.fileId
        const updatingData = req.body
        let foundData = ""

        for (let iterator in fileData) {
            if (fileData[iterator].id == fileId) {
                foundData = fileData[iterator]

            }
        }
        if (!foundData) { return res.status(404).send({ status: false, msg: "File Not Found" }) }
        fileData[fileId] = { ...foundData, ...updatingData }

        return res.status(200).send({ status: true, data: fileData[fileId] })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err })

    }
}
module.exports.updateFile = updateFile
module.exports.deleteFile = deleteFile
module.exports.getByName = getByName
module.exports.getAll = getAll
module.exports.createFile = createFile