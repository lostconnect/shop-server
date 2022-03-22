// класс будет расширять error стандартный ;
class ApiError extends Error {
  constructor(status, message) {
    super(message); //расширяем родительский конструктор
    // присваемваем то что получаем параметром
    this.status = status;
  }

  //  создадим статические функции, которые можно вызывать без создания объекта
  static notFound(message) {
    //передаем статус код и сообщение об ошибке
    return new ApiError(404, message);
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unauthorized(message) {
    return new ApiError(401, 'User is not authorized');
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
