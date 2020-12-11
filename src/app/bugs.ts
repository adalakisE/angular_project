export interface Bugs {
    id:number;
    title: string;
    description: string
    priority: number;
    reporter: string;
    status: string;
    updatedAt: Date;
    createdAt: Date,
    comments: [{
        reporter: string,
        description: string,
        id: string
    }]
}



// "id": "5fd3a191ed07f8001732edd9",
// "title": "asd",
// "description": "sad",
// "priority": 1,
// "reporter": "QA",
// "status": "Done",
// "updatedAt": "2020-12-11T16:42:57.460Z",
// "createdAt": "2020-12-11T16:42:57.460Z",
// "comments": null