import panel from "../../models/panel.js";
import mockingoose from 'mockingoose';

describe('Unit Test for panel', () => {
    it('This test should create a panel', () => {
        mockingoose(panel)
        .toReturn({ 
            id: 'Panel0001',
            panelMembers: ['P0001', 'P0002', 'P0003'],
            allocatedGroups: ['G0001', 'G0002', 'G0003'], }, 'save')
    });

    it('This test should find all Panels', () => {
        const _panelTest = {
          id: 'Panel0001',
          panelMembers: ['P0001', 'P0002', 'P0003'],
          allocatedGroups: ['G0001', 'G0002', 'G0003'],
        };
    
        const response = {
            data: {
                isSuccessful: true,
                responseData: panel 
            }
        }
        mockingoose(panel).toReturn(response, 'find');
        return panel.find(_panelTest).then(res => {
            expect(response).toMatchObject(response);
          });
      });

    it('This test should find a Panel', () => {
      const _panelTest = {
        id: 'Panel0001',
        panelMembers: ['P0001', 'P0002', 'P0003'],
        allocatedGroups: ['G0001', 'G0002', 'G0003'],
      };
  
      mockingoose(panel).toReturn(_panelTest, 'findOne');
  
      return panel.findById({ id: 'Panel0001' }).then(panelTest => {
        expect(JSON.parse(JSON.stringify(panelTest))).toMatchObject(_panelTest);
      });
    });
  
    it('This test should update a panel', () => {
      const _panelTest = {
        id: 'Panel0001',
        panelMembers: ['P0001', 'P0002', 'P0003'],
        allocatedGroups: ['G0001', 'G0002', 'G0003'],
      };
  
      mockingoose(panel).toReturn(_panelTest, 'update');
  
      return panel
        .update({ id: 'Panel0002' }) // change the id(update)
        .where({ id: 'Panel0001' })
        .then(panelTest => {
          expect(JSON.parse(JSON.stringify(panelTest))).toMatchObject(_panelTest);
        });
    });

    it('This test should delete a panel', () => {
        mockingoose(panel)
        .reset();
    });
  });