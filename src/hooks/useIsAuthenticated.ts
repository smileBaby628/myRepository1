/*
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import {AuthContext} from "../AuthProvider";

function useIsAuthenticated(): ()=>boolean {
    const context = React.useContext(AuthContext)

    return () => {
        if (context?.authState.authToken && context?.authState.expireAt) {
            if (new Date(context.authState.expireAt) > new Date()) {
                return true
            } else {
                context.setAuthState({
                    authToken: null,
                    authTokenType: null,
                    expireAt: null,
                    authState: null
                })
                return false
            }
        } else {
            return false
        }
    }
}

export default useIsAuthenticated