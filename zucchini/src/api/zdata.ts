import { IssuesResponse, ZData } from "./zmodels";

export function getData(name: string) {
  try {
    const data: ZData = JSON.parse(
      window.localStorage.getItem(name) as string
    );

    return data;
  } catch {
    const d: ZData = {
      key: "",
      value: "",
      expires: 0,
      created: 0,
    };
    return d;
  }
}

export function createData(name: string, data: string, minutes: number) {
  const date = new Date().getTime();

  const value: ZData = {
    key: name,
    value: data,
    created: date,
    expires: date + minutes * 60 * 1000,
  };

  console.log(JSON.stringify(value));

  window.localStorage.setItem(name, JSON.stringify(value));
}

export function removeData(name: string) {
  window.localStorage.removeItem(name);
}

export function isValid(obj: any) {
  if (obj === undefined || obj === null || obj.length < 1) {
    console.log("Empty");
    return false;
  }

  return true;
}

export function parseIssues(json: any) {
  const issues : IssuesResponse = (json);
  return issues;
}