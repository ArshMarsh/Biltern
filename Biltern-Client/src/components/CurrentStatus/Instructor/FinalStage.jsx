import React, {useEffect, useState} from 'react';
import ActionButton from '../../../UI/ActionButton';
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../../features/alertSlice';
import { getGradingForm } from '../../../apiHelper/backendHelper';

import classes from '../CurrentStatus.module.css';

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This component is responsible for displaying student final stage for instructor
 */

const FinalStage = (props) => {
    const {id} = props;
    const [gradeFile, setGradeFile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getGradingForm(id, "arraybuffer", true)
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                setGradeFile(blob);
            })
            .catch(err => {
                dispatch(setTimedAlert({msg: "Error while fetching grading", alertType: "error", timeout: 4000}));
            });
    }, []);

    const downloadReport = (blob) => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, 'file.pdf');
        } 
        else {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'file.pdf';
            link.click();
        
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                link.remove();
            }, 0);
        }
    }

    const downloadGradingFormHandler = () => {
        downloadReport(gradeFile);
    }

    return (
        <div className={classes.iterationStage}>
            <div className={classes.actions}>
                <div className={classes.buttons}>
                    <ActionButton
                        className=""
                        text="Download Grading Form"
                        onClick={downloadGradingFormHandler}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default FinalStage;