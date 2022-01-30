namespace BusinessLogic.Exceptions
{
    public class ApiException : Exception
    {
        public ErrorCode ErrorCode { get; set; }

        public ApiException(ErrorCode errorCode = ErrorCode.InvalidInput)
        {
            ErrorCode = errorCode;
        }

        public ApiException(string message, ErrorCode errorCode = ErrorCode.InvalidInput) : base(message)
        {
            ErrorCode = errorCode;
        }

        public ApiException(string message, Exception inner, ErrorCode errorCode = ErrorCode.InvalidInput)
            : base(message, inner)
        {
            ErrorCode = errorCode;
        }
    }
}
