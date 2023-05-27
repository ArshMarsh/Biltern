package Caffe.BilternServer.users;

import Caffe.BilternServer.report.Report;
import Caffe.BilternServer.auth.BilternUser;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Student extends BilternUser {

    @Column
    private String department;


    @OneToMany
    @JoinColumn(name = "reportId")
    private List<Report> reports;


    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<Report> getReports() {
        return reports;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

}
