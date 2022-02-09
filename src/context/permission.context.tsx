import { createContext, FC, useEffect } from "react";
import { createContextualCan } from "@casl/react";
import { AnyMongoAbility, defineAbility } from "@casl/ability";
import { db } from "../db/db";

export const ability = defineAbility((can, cannot) => can([]));

export const AbilityContext = createContext<AnyMongoAbility>(null!);
export const Can = createContextualCan(AbilityContext.Consumer);

export const AbilityProvider: FC = ({ children }) => {
  useEffect(() => {
    const getInitialPermission = async () => {
      const permissionsFromDB = await db.permission.toArray();

      const permissions = permissionsFromDB.map((permission) => ({
        action: permission.action,
        subject: permission.subject,
      }));
      ability.update(permissions);
    };
    getInitialPermission();
  }, []);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};
