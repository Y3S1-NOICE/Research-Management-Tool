
import user from "../../models/user.js";
import mockingoose from 'mockingoose';

//unit test for registering users
test('Should find users', () => {
    const fakeUser = {
        id: 'IT20274702',
        name: 'Shehan',
        role: 'Admin',
        email: 'it20274702@my.sliit.lk'
    }
    const response = {
        data: {
            isSuccessful: true,
            responseData: user
        }
    }
    mockingoose(user).toReturn(response, 'find');
    return user.find(fakeUser).then(res => {
        expect(response).toMatchObject(response);
      });
});
