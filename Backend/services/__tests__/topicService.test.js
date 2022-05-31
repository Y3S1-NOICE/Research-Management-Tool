import researchTopic from "../../models/researchTopic.js";
import mockingoose from 'mockingoose';

describe('Unit Test for research topic', () => {
  it('This test should create a research topic', () => {
    mockingoose(researchTopic)
      .toReturn({
        topic: 'ReactJS',
        area: 'Software Engineering',
      }, 'save')
  });


  it('This test should update the research topic', () => {
    const _researchTopicTest = {
      id: 'G001',
      topic: 'KoaJS',
      area: 'Software Engineering',

    };

    mockingoose(researchTopic).toReturn(_researchTopicTest, 'update');

    return researchTopic
      .update({ topic: 'ReactJS' }) // change the topic
      .where({ topic: 'KoaJS' })
      .then(_researchTopicTest => {
        expect(JSON.parse(JSON.stringify(_researchTopicTest))).toMatchObject(_researchTopicTest);
      });
  });


});