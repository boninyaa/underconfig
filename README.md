<img src="assets/underconfig-title.png" width="500"/>

<h1 class="question">underconfig</h1>
straight-forward, fast tf2 configurator with just a .cfg file!

it's kind of like [mastercomfig](https://github.com/mastercomfig/mastercomfig), but with an utilitarian philosophy.

features:
- no .vpk files
- no need to add anything to tf/custom
- no aliases for source convars that already exist
- meaning it is super easy to manually edit
- you can also clone this repo and use it completely offline as it has zero CDN reliance and fully portable

<h1>faq</h1>
<p>(more on https://underconfig.me/faq)</p><br>
<p><strong>is this safe to use?</strong></p>
<p>yes. it is 100% safe to use.</p>
<p>no, it will not get you VAC banned, explode your computer or give your dog lung cancer.</p>
<p>no one has ever been VAC banned or gotten a virus from using console variables in a source game.</p>
<p> convars, aka console commands, do NOT have the power to change any files in either TF2 or your base system. they also do not have the power to affect server-side functionality, your items or your steam account. they purely concern settings in your current TF2 installation and they can be very easily restored by removing all extra cfg and/or custom files and appending <code>-autoconfig</code> to your TF2 launch arguments. more on resetting settings below.</p><br>

<p><strong>is this "better" than mastercomfig?</strong></p>
<p>functionally not very much so. from a purely technical sense, this is far less advanced than masterconfig. but that is also exactly why this exists in the first place. i have nothing against mastercomfig itself, but i was annoyed by how sort of unnecessarily extensive it is and how much it relies on relentless aliasing for "simplicity" and having you deal with multiple .vpk files when most of the things it achieves can be done with one cfg file.</p>
<p>this serves to do exactly that. zero custom aliases and all you get is a .cfg file that you can paste into your tf2 dir.</p><br>

<p><strong>how do i use it?</strong></p>

<p>either<br>click the "autoexec.cfg" button and download the .cfg file<br><strong>or</strong><br>click the "copy!" button, open a blank text editor, paste, then save it as either autoexec.cfg or anything else<br>(if you name it something other than autoexec, make sure to still create an autoexec.cfg file and add "exec yourconfigname" to it!)</p>
            
<p>on windows, your cfg folder is typically located in
<code>C:\Program Files (x86)\Steam\steamapps\common\Team Fortress 2\tf</code></p>
<p>on linux (non-flatpak), your cfg folder is typically located in
<code>/home/yourusername/.local/share/Steam/steamapps/common/Team Fortress 2/tf/</code></p>

<p>if you installed the game somewhere else or don't want to bother finding the directory yourself, you can right click TF2 in your steam library and choose the option that automatically opens the game directory.</p>
<p>put the autoexec.cfg in your "cfg" folder (NOT "custom") inside "tf" and you're set!</p>
