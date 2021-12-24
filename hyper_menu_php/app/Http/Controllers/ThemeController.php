<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use Illuminate\Http\Request;

class ThemeController extends Controller
{

    public function index()
    {
        $path = storage_path() . "/app/public/themes/themes.json"; 
        $themes = json_decode(file_get_contents($path), true); 

        for ($i = 0; $i <= count($themes) -1 ; $i++) {
            $themes[$i]["thumbnail"] =  env("APP_SERVER_URL").$themes[$i]["thumbnail"] ;
        }
     
        return  $themes;
    }

}
