import Shrinkform from "../models/FormModel.js";


export const createShrinkForm = async (req, res) => {
    const {  setupParameters,
        userMethod,
        date,
        applicant,
        pf,
        machine,
        spliceType,
        wireDescription,
        sleeve
    } = req.body; 
    
    try {

        const shrinkForm = await Shrinkform.create({
            setupParameters,
            userMethod,
            date,
            applicant,
            pf,
            machineName: machine, 
            spliceType,
            wireType: wireDescription.side1[0].wireType,
            crossSection: wireDescription.side1[0].crossSection,
            glueDesignation: "",
            valueTechnician1: "",
            valueTechnician2: "",
            valueTechnician3: "",
            averageValue: "",
            temperature: 0,
            timeOrVelocity: "",
            coolingTime: 0,
            coreTemperature: 0,
            filePath: "",
            fileType: "",
            fileSize: 0,
        });

        res.status(201).json({ msg: "Form Created Successfully", shrinkForm });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

