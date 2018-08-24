import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../_services/data.service';
import { Subscription } from 'rxjs/Subscription';

import { MemberModal, SpecificMemberModal } from '../_services/sports.model';
import 'jquery-ui-dist/jquery-ui';

import $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  userRole: string;
  userName: string;
  errorMsg: string;
  private sportSubscription: Subscription;
  membermodal: MemberModal;
  specificmembermodal: SpecificMemberModal;
  myData: any;
  playerForm: FormGroup;
  playerForm1: FormGroup;
  isReadOnly: boolean = true;
  catrole: string;
  hideloadedform: boolean = false;
  submittedSuccess: string = "";
  submittedSuccess1: string = "";
  selectedFile: File = null;
  idvalue: number;
  nameDelete: string;
  deletedSuccess: string = "";


  constructor(private dataService: DataService,
    private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.playerForm = fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      country: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.playerForm1 = fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      role: ['', Validators.required],
      id: ['', Validators.required],
      photo: ['/assets/images/profile_default.jpg']
    });
  }

  ngOnInit() {
    let jsonData = JSON.parse(sessionStorage.getItem("currentUser"));
    this.userRole = jsonData.role;
    this.userName = jsonData.username;
    this.getSportsData();
    $(window).click(function () {
      //Hide the menus if visible
      $('.context-menu').hide();
    });




  }

  getSportsData() {
    this.sportSubscription = this.dataService.getPlayerData()
      .subscribe((data) => {
        if (data != null) {
          this.myData = data;
          this.playercategory('country');
        } else {
          this.errorMsg = "Server Error";
        }
      },
      resError => {
        this.errorMsg = resError;
      },
    )
  }

  playercategory(value) {
   
    this.catrole = value;
    if (value == 'role') {
      this.membermodal = this.myData.reduce((r, { role }) => {
        if (!r.some(o => o.role == role)) {
          r.push({ role, groupItem: this.myData.filter(v => v.role == role) });
        }
        return r;
      }, []);
    } else {
      this.membermodal = this.myData.reduce((r, { country }) => {
        if (!r.some(o => o.country == country)) {
          r.push({ country, groupItem: this.myData.filter(v => v.country == country) });
        }
        return r;
      }, []);
    }

  }

  showContextMenu(event, index, name) {
    if (this.userRole == "admin") {
    document.getElementById('contextMenu' + index).style.display = 'block';
    document.getElementById('contextMenu' + index).style.left = event.pageX + 'px';
    document.getElementById('contextMenu' + index).style.top = event.pageY + 'px';
    document.getElementById('contextMenuRole' + index).style.display = 'block';
    document.getElementById('contextMenuRole' + index).style.left = event.pageX + 'px';
    document.getElementById('contextMenuRole' + index).style.top = event.pageY + 'px';    
    this.nameDelete = name;
    return false;
    }
  }



  specificPlayer(firstindex, secondindex) {
    this.hideloadedform = false;
    this.deletedSuccess = "";
    this.submittedSuccess = "";
    this.submittedSuccess1 = "";
     this.isReadOnly = true;
    this.specificmembermodal = this.membermodal[firstindex].groupItem[secondindex];
    $(function () {
      $("#draggable").draggable();
    });
  }

  edit() {
    if (this.userRole == "admin") {
      this.isReadOnly = false;
    }
  }



  addnewplayer() {
    this.submittedSuccess1="";
    this.hideloadedform = true;
    this.idvalue = this.myData.length + 1;
  }

  updatePlayer(data) {
    if (this.playerForm.valid) {
      this.dataService.updatePlayer(this.myData)
        .subscribe((data) => {
          this.submittedSuccess = "Data Updated Successfully";
          this.playercategory(this.catrole)
        },
        resError => {
          this.errorMsg = resError;
        },
      )
    }

  }

  addPlayer(data) {
    this.myData.push(data);
    if (this.playerForm1.valid) {
      this.dataService.addPlayer(this.myData)
        .subscribe((data) => {
          this.submittedSuccess1 = "Data Added Successfully";
          this.playerForm1.reset();
          this.hideloadedform = false;
          this.playercategory(this.catrole);
        },
        resError => {
          this.errorMsg = resError;
        },
      )
    }
  }

  deletePlayer(deletevalue) {

   var index = this.myData.map(function (e) { return e.name; }).indexOf(deletevalue);
   console.log(index);

    this.myData.splice(index, 1);
    this.dataService.deletePlayer(this.myData)
      .subscribe((data) => {
        this.deletedSuccess = "Data Deleted Successfully";
        this.playercategory(this.catrole);
      },
      resError => {
        this.errorMsg = resError;
      },
    )
  }

}
