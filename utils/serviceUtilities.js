export const jsonResponse = (isSuccessful, responseData, error) => {
    return {
        isSuccessful: isSuccessful,
        responseData,
        errorMessage: error
    }
}