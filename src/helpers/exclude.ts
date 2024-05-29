function excludePasswordFromUser(user: any, keys: any[]): Omit<any, any> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

export default excludePasswordFromUser;
