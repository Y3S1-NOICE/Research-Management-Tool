import { updateResearchTopicDetails, evaluateStudentGroupByPanel } from '../studentGroupApi';
import axios from 'axios';

jest.mock('axios');

// Unit test for creating a research topic
test('Should create topic', () => {
    const topic = {
        topic: 'Software Engineering',
        area: 'ReactJS',
    }
    const response = {
        data: {
            isSuccessful: true,
            responseData: user
        }
    }
  axios.post.mockResolvedValue(response);
  return updateResearchTopicDetails(topic).then(data => expect(data).toEqual(response));
});

// Unit test for evaluating students by panel
test('Should evaluate students by panel', () => {
    const topic = {
            panelEvaluateFeedbacks: 'great topic',
        }
        const response = {
            data: {
                isSuccessful: true,
                responseData: user
            }
        }
      axios.post.mockResolvedValue(response);
      return evaluateStudentGroupByPanel(topic).then(data => expect(data).toEqual(response));
    });

