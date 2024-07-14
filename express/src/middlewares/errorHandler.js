const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      // error: process.env.NODE_ENV === 'dev' ? err : {},
      error: err
    });
  };
  
module.exports = errorHandler;