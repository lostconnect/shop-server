// класс будет расширять error стандартный ;
class ApiError extends Error {
  constructor(status, message) {
    super(); //расширяем родительский конструктор
    // присваемваем то что получаем параметром
    this.status = status;
    this.message = message;
  }

  //  создадим статические функции, которые можно вызывать без создания объекта
  static badRequest(message) {
    //передаем статус код и сообщение об ошибке
    return new ApiError(404, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
