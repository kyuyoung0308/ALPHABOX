import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Year, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject } from '@syncfusion/ej2-react-schedule';
import {Internationalization } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';
import './syncfusion.css';

import { addJournalEntry, getEntries } from '../../firebase'
import { positiveWords } from './positive-words'
import { negativeWords } from './negative-words'

export class Overview extends SampleBase {
    state = {
      entries: []
    }

    constructor() {
        super(...arguments);
        this.intl = new Internationalization();
        this.weekDays = [
            { text: 'Sunday', value: 0 },
            { text: 'Monday', value: 1 },
            { text: 'Tuesday', value: 2 },
            { text: 'Wednesday', value: 3 },
            { text: 'Thursday', value: 4 },
            { text: 'Friday', value: 5 },
            { text: 'Saturday', value: 6 }
        ];

        this.calendarCollections = [
            { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
            { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
            { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
            { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
        ];

        this.timeFormatData = [
            { Name: "12 hours", Value: "hh:mm a" },
            { Name: "24 hours", Value: "HH:mm" }
        ];
    };

    async componentDidMount() {
      this.fillJournal(); //fills
      this.setState({
        entries: await getEntries() //gets notes and STORE into notes state
      })
      console.log('>> entries', this.state.entries);
    }

    getDateHeaderText(value) {
        return this.intl.formatDate(value, { skeleton: 'Ed' });
    }

    dateHeaderTemplate(props) {
        return (<div><div>{this.getDateHeaderText(props.date)}</div></div>);
    }

    //add mock data to Firebase
    async fillJournal(){

     let c = await getEntries();
     if(c.length > 0)
     return;

      //create 20 journal entries and push into database
      for (let i = 0; i < 20; i++) {

        const numOfNegative = Math.floor(Math.random() * 10);
        const numOfPositive = Math.floor(Math.random() * 10);

        let note = '';

        for (let j = 0; j < numOfNegative; j++) {
          const randomIndex = Math.floor(Math.random() * (negativeWords.length - 1));
          note += ` ${negativeWords[randomIndex]}`;
        }

        for (let j = 0; j < numOfPositive; j++) {
          const randomIndex = Math.floor(Math.random() * (positiveWords.length - 1));
          note += ` ${positiveWords[randomIndex]}`;
        }
          let timestamp =  new Date(2022, 1, i+1).getTime() +  Math.floor(Math.random()*1000);
      
        addJournalEntry(note, timestamp);
      }

    }

    onRenderCell = (args) => {
      if (args.elementType === 'monthCells') {
        const day = new Date(args.date).getDate(); 
        const month = new Date(args.date).getMonth(); 
        const year = new Date(args.date).getFullYear(); 
 
        const entries = this.state.entries.filter(entry => new Date(entry.date).getDate() === day && month === new Date(entry.date).getMonth() && year === new Date(entry.date).getFullYear());

        let positiveCount = 0;
        let negativeCount = 0;

        if(entries){

        for(const entry of entries){
            const words = entry.message.split(" ");

          for (const word of words) {
            if (positiveWords.includes(word)) positiveCount++;
            else if (negativeWords.includes(word)) negativeCount++;
          }

          let total = positiveCount + negativeCount;

          if (positiveCount > negativeCount) {
            positiveCount = Math.floor(255 * positiveCount/total);
            args.element.setAttribute('style', 'background-color: rgb(0, '+positiveCount+', 0)');
          } else if (negativeCount > positiveCount) {
            negativeCount = Math.floor(255 * negativeCount/total);
            args.element.setAttribute('style', 'background-color: rgb('+negativeCount+',0,0)');
          } else {
            args.element.setAttribute('style', 'background-color: yellow');
          }
        }
      }
    }
  }
    ///////////////////////////////rendered FRONT END//////////////////////////////////////////////
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='content-wrapper'>
            <div className='schedule-overview'>
              <div className='overview-header'>
                <div className='overview-titlebar'>
                  <div className='left-panel'>
                    <div className='schedule-overview-title' style={{ border: '1px solid transparent' }}>Calendar</div>
                  </div>
                </div>
              </div>
              <div className='overview-content'>
                <div className='left-panel'>
                  <div className='overview-scheduler'>
                    <ScheduleComponent id='scheduler' cssClass='schedule-overview' renderCell={this.onRenderCell} ref={(schedule) => this.scheduleObj = schedule} width='100%' height='100%' group={{ resources: ['Calendars'] }} dateHeaderTemplate={this.dateHeaderTemplate.bind(this)}>
                      <ResourcesDirective>
                        <ResourceDirective field='CalendarId' title='Calendars' name='Calendars' dataSource={this.calendarCollections} query={new Query().where('CalendarId', 'equal', 1)} textField='CalendarText' idField='CalendarId' colorField='CalendarColor'>
                        </ResourceDirective>
                      </ResourcesDirective>
                      <ViewsDirective>
                        <ViewDirective option='Day'/>
                        <ViewDirective option='Week'/>
                        <ViewDirective option='WorkWeek'/>
                        <ViewDirective option='Month'/>
                        <ViewDirective option='Year'/>
                      </ViewsDirective>
                      <Inject services={[Day, Week, WorkWeek, Month, Year]}/>
                    </ScheduleComponent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }

}

export default Overview;