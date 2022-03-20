const ApiError = require("../error/ApiError")

//создадим функцию которая и будет middleware 
// она принимает ошибку, запрос ответ и next, которой передадим следующую в цепочке middleware 
module.exports = function (err, req, res, next) {
  //проверим если ошибка принадлежит apierror
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  //если выше ошибка у нас не попала - вернем инстанс с 500 ошибкой
  return res.status(500).json({ message: "Непредвиденная ошибка" })
}