export const submitUser = (userData: { firstName: string; lastName: string; email: string; message: string }) => ({
    type: 'SUBMIT_USER',
    payload: userData
});
