import { updateResearchTopicDetails, evaluateStudentGroupByPanel } from '../studentGroupApi';
import axios from 'axios';

jest.mock('axios');

        test("Should evaluate students by panel", async () =>{
        const response = {
            panelEvaluateFeedbacks: 'great topic',
        }
        const groupId = 'G0001'
        const request={
            topic: 'Software Engineering',
            area: 'ReactJS'
        }
        axios.put.mockResolvedValueOnce(response);
        const result = await evaluateStudentGroupByPanel(groupId, request);
        expect(result).toEqual(response);
        return result;
    })

    test("Should create topic", async () =>{
        const response = {
            topic: 'Software Engineering',
            area: 'ReactJS',
        }
        const groupId = 'G0001'
        const request={
            topic: 'Software Engineering',
            area: 'ReactJS'
        }
        axios.put.mockResolvedValueOnce(response);
        const result = await updateResearchTopicDetails(groupId, request);
        expect(result).toEqual(response);
        return result;
    })
    