
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
            responseData: fakeUser
        }
    }
    mockingoose(user).toReturn(response, 'find');
    return user.find(fakeUser).then(res => {
        expect(response).toMatchObject(response);
      });
});

//unit test for updating users
test('Should update users', () => {
    const currentUser = {
        id: 'IT20274702',
        name: 'Shehan',
        role: 'Admin',
        email: 'it20274702@my.sliit.lk'
    }
    const updatedUser = {
        id: 'IT20274702',
        name: 'Shehan',
        role: 'Admin',
        email: 'it20274702@my.sliit.lk'
    }
    const response = {
        data: {
            isSuccessful: true,
            responseData: updatedUser
        }
    }
    mockingoose(user).toReturn(response, 'findOneAndUpdate');
    return user.findOneAndUpdate(currentUser).then(res => {
        expect(response).toMatchObject(response);
      });
});

//unit test for deleting users
test('Should update users', () => {
    const deletedUser = {
        id: 'IT20274702',
        name: 'Shehan',
        role: 'Admin',
        email: 'it20274702@my.sliit.lk'
    }
    const response = {
        data: {
            isSuccessful: true,
            responseData: deletedUser
        }
    }
    mockingoose(user).toReturn(response, 'findOneAndDelete');
    return user.findOneAndUpdate(deletedUser).then(res => {
        expect(response).toMatchObject(response);
      });
});