import studentGroup from "../../models/studentGroup.js"
import mockingoose from "mockingoose/lib"

//Test Creating a student group
test('Should create a student group', () =>{
    mockingoose(studentGroup)
    .toReturn({
        id: "G0001",
        studentsId: [
            "IT20020262",
            "IT20020263"
        ],
        supervisorId: "Not Assigned",
        coSupervisorId: "Not Assigned",
        topicEvaluationPanelId: "Not Assigned",
        presentationEvaluationPanelId: "Not Assigned",
        status: "Topic Not Registered",
        panelEvaluateFeedbacks: "Pending",
        evaluation: []
    }, 'save');
})

//Test fetch one student group
test('Should fetch specific group by Id', () =>{
    const response = {
        id: "G0001",
        studentsId: [
            "IT20020262",
            "IT20020263"
        ],
        supervisorId: "Not Assigned",
        coSupervisorId: "Not Assigned",
        topicEvaluationPanelId: "Not Assigned",
        presentationEvaluationPanelId: "Not Assigned",
        status: "Topic Not Registered",
        panelEvaluateFeedbacks: "Pending",
        evaluation: [],
        researchTopic: {
            topic: "Koa JS",
            area: "React JS frontend",
        }
    };
    
    mockingoose(studentGroup).toReturn(response, 'findOne')
    return studentGroup.findOne({ id: 'G0001' }).then(res => {
        expect(JSON.parse(JSON.stringify(res))).toMatchObject(response);
      });
})

//Request Supervisor to a student group
test("Request a supervisor", () =>{
    const response ={
        supervisorId: "S0001",
        status: "Supervisor Pending"
    }  
    const request={
        supervisorId:"S0001"
    }
    mockingoose(studentGroup).toReturn(response, 'findOneAndUpdate');
    return studentGroup.findOneAndUpdate({id:'G0001'}, request).then(res => {
        expect(res).toMatchObject(response);
    });
})

//Request Co-Supervisor to a student group
test("Request a co-supervisor", () =>{
    const response ={
        coSupervisorId: "S0002",
        status: "Co-Supervisor Pending"
    }  
    const request={
        coSupervisorId:"S0002"
    }
    mockingoose(studentGroup).toReturn(response, 'findOneAndUpdate');
    return studentGroup.findOneAndUpdate({id:'G0001'}, request).then(res => {
        expect(res).toMatchObject(response);
    });
})

//Allocate Panel to a student group
test("Allocate panel to a student group", () =>{
    const response ={
        topicEvaluationPanelId: "P0001"
    }  
    const request={
        topicEvaluationPanelId: "P0001"
    }
    mockingoose(studentGroup).toReturn(response, 'findOneAndUpdate');
    return studentGroup.findOneAndUpdate({id:'G0001'}, request).then(res => {
        expect(res).toMatchObject(response);
    });
})

//Assign marks to a student group
test("Assign marks to a student group", () =>{
    const response ={
        evaluation:[{
            id: "S0001",
            evaluationType:"Topic",
            marks:"80"
        }]
    }
    const request={
        id: "S0001",
        evaluationType:"Topic",
        marks:"80"
    }
    mockingoose(studentGroup).toReturn(response, 'findOneAndUpdate');
    return studentGroup.findOneAndUpdate({id:'G0001'}, request).then(res => {
        expect(res).toMatchObject(response);
    });
})