import { accountService } from "@/services/accountService";
import { Account } from "@/types/account";
import { useEffect, useState } from "react";

export const useAccountList = () => {
     const [accounts, setAccounts] = useState<Account>();
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchAccount = async () => {
          try {
               const data = await accountService.getListAccount();
               setAccounts(data);
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
        fetchAccount();
     }, []);
 

     return { accounts, loading, error };
}