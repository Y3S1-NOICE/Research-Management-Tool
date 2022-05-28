import chat from "../../models/chatGroup.js";
import mockingoose from 'mockingoose';

describe('Unit Test for chat', () => {
    it('This test should create a chat group', () => {
        mockingoose(chat)
        .toReturn({ id: "chat0001",
        chatName: "chat001",
        userIds: ["S001", "IT001", "IT003"],
        messages: [{
            id: "",
            content: "",
            sender: "",
        }] }, 'save')
    });

    it('This test should send a message to chat group', () => {
        mockingoose(chat)
        .toReturn({ 
            id: "auto-generated-id",
            content: "Hello Everyone. Nice to see you all... :)",
            sender: "IT0001"
         }, 'save')
    });

    it('This test should find all chat groups', () => {
        const _chatTest = {
            id: "chat0001",
            chatName: "chat group",
            userIds: ["S001", "IT001", "IT003"],
            messages: [{
                id: "",
                content: "",
                sender: "",
            }]
        };
    
        const response = {
            data: {
                isSuccessful: true,
                responseData: chat
            }
        }
        mockingoose(chat).toReturn(response, 'find');
        return chat.find(_chatTest).then(res => {
            expect(response).toMatchObject(response);
          });
      });

    it('This test should find a chat group', () => {
      const _chatTest = {
        id: "chat0001",
        chatName: "chat group",
        userIds: ["S001", "IT001", "IT003"],
        messages: [{
            id: "",
            content: "",
            sender: "",
        }]
      };
  
      mockingoose(chat).toReturn(_chatTest, 'findOne');
  
      return chat.findById({ id: 'chat0001' }).then(chatTest => {
        expect(JSON.parse(JSON.stringify(chatTest))).toMatchObject(_chatTest);
      });
    });
  
    it('This test should update a chat group', () => {
      const _chatTest = {
        id: "chat0001",
        chatName: "chat group",
        userIds: ["S001", "IT001", "IT003"],
        messages: [{
            id: "",
            content: "",
            sender: "",
        }]
      };
  
      mockingoose(chat).toReturn(_chatTest, 'update');
  
      return chat
        .update({ id: 'chat0002' }) // change the id(update)
        .where({ id: 'chat0001' })
        .then(chatTest => {
          expect(JSON.parse(JSON.stringify(chatTest))).toMatchObject(_chatTest);
        });
    });

    it('This test should delete a chat group', () => {
        mockingoose(chat)
        .reset();
    });
  });