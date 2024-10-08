export interface FormData {
    name: string;
    birthday: string;
    gender: string;
    mainGoal: string;
    specialDiets: string;
    healthConditions: string;
    comment: string;
    email: string;
    password: string;
    image: File | undefined;
}

export interface Errors {
    name: string;
    birthday: string;
    gender: string;
    mainGoal: string;
    specialDiets: string;
    email: string;
    password: string;
}
  