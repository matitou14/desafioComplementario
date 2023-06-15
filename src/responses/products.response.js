export const success = (res, data, message = "Success") => {
    return res.status(200).json({
      status: "success",
      message: message,
      data: data,
    });
  };
  
  export const error = (res, message = "Error interno del servidor", status = 500) => {
    return res.status(status).json({
      status: "error",
      message: message,
    });
  };
  
  export const notFound = (res, message = " Product not found") => {
    return res.status(404).json({
      status: "error",
      message: message,
    });
  };