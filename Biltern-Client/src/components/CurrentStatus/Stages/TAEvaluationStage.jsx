import React from 'react';
import FileUpload from "../../../UI/FileUpload";
import axios from 'axios';
import ActionButton from '../../../UI/ActionButton';
import { useNavigate } from 'react-router-dom';

import classes from '../CurrentStatus.module.css';

const TAEvaluationStage = (props) => {
    const {id} = props;
    const navigate = useNavigate();

    const submitHandler = (files) => {
        console.log(files[0]);
    };

    const fetchReport = async ({onFetchReport, path}) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || ""
            }
        };

        await axios.get(`http://localhost:8080/${path}`, {config, responseType: 'arraybuffer'})
            .then(res => {
                const blob = new Blob([res.data], {type: 'application/pdf'});
                onFetchReport(blob);
            })
            .catch(err => {
                // dispatch(setTimedAlert({msg: "Error while fetching notifications", alertType: "error", timeout: 4000}));
                console.log(err);
            });
    };

    const ViewReportHandler = () => {
        console.log("navigate to report with id to display report");
        // navigate("/report/1");
    }

    const viewFeedbackHandler = () => {
        console.log("navigate to feedback with id to display feedback");
        // navigate("/feedback/1");
    }

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

    const downloadStudentReportHandler = () => {
        fetchReport({onFetchReport: downloadReport, path: `report/reportContent/${id}`}); 
    }

    const downloadFeedbackHandler = () => {
        fetchReport({onFetchReport: downloadReport, path: `report/reportContent/${id}`}); 
    }

    return (
        <div className={classes.actions}>
            <div className={classes.buttons}>
                <ActionButton
                    className=""
                    text="Download Student Report"
                    onClick={downloadStudentReportHandler}
                />
                <ActionButton
                    className=""
                    text="View Student Report"
                    onClick={ViewReportHandler}
                />
                <ActionButton
                    className=""
                    text="Download TA Feedback"
                    onClick={downloadFeedbackHandler}
                />
                <ActionButton
                    className=""
                    text="View TA Feedback"
                    onClick={viewFeedbackHandler}
                />
            </div>
            <div>
                <FileUpload 
                    accept=".pdf" 
                    multiple={false}
                    onSubmit={submitHandler} 
                    dragMessage="Drag and drop a pdf file or click here"
                    uploadMessage="Upload a pdf file"
                    buttonMessage="Upload"    
                />
            </div>
        </div>
    )
}

export default TAEvaluationStage;