<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Page;
use Illuminate\Support\Facades\Auth;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;


class MenuController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return Menu::where('user_id',Auth::id())->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {  
  
        if( strlen($request->name) == 0)
        return response()->json(["errors"=>["name"=>"The name field is required."]], 401);
        $menu = new Menu;
        $menu->name = $request->name;
        $menu->description = $request->description;
        $menu->template_class = "none";
        $menu->user_id = Auth::id();
        $menu->save();
 

        $filename =  $request->name.time().".svg";
        Storage::disk('public')->put($filename,QrCode::size(100)->format('svg')->generate(env('CLIENT_URL').$menu->id));
        $menu->qr = env('APP_SERVER_URL')."storage/app/public/".$filename;
        $menu->save();

        $page = new Page;
        $page ->name = "First Page";
        $page ->menu_id = $menu->id;
        $page->save();

         return $menu->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Menu::find($id);
      
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
       $menu = Menu::find($id);
       $menu->template_class = $request->template_class;
       $menu->save();
       return  $menu->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Menu::destroy($id);
    }
}
