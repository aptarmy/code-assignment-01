module.exports.success = ({ res, data, ...args }) => res.status(200).json({ success: true, data, ...args })
module.exports.badRequest = ({ res, message, ...args }) => res.status(400).json({ success: false, message, ...args })
module.exports.notFound = ({ res, message, ...args }) => res.status(404).json({ success: false, message, ...args })
module.exports.serverError = ({ res, message, ...args }) => res.status(500).json({ success: false, message, ...args })