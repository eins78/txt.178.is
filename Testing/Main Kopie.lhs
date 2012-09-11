{-# LANGUAGE ScopedTypeVariables #-}

-- Minimal browser based on the gtk2hs webkit demo
--
-- Usage:
--      Helium [uri]
--
module Main where

import Graphics.UI.Gtk
import Graphics.UI.Gtk.WebKit.WebInspector
import Graphics.UI.Gtk.WebKit.WebSettings
import Graphics.UI.Gtk.WebKit.WebView
import Graphics.UI.Gtk.WebKit.WebFrame

import System.Posix.Signals
import System.Process
import System.Environment

-- | Main entry.
main :: IO ()
main = do
  -- Get program arguments.
  args <- getArgs
  case args of
    -- Display help
    ["--help"] ->
       putStrLn $ "Welcome to Gtk2hs WebKit demo. :)\n\n" ++
                  "Usage: webkit [uri]\n\n" ++
                  "  -- Gtk2hs Team"
    ["--version"] -> putStrLn "20120911"
    -- Start program.
    [arg]    -> browser arg
    _        -> browser "http://www.klassik-stiftung.de"

-- | Internal browser fucntion.
browser :: String -> IO ()
browser url = do
  -- Init.
  initGUI

  -- Create window.
  window <- windowNew

  -- No title bar, resize controls, etc.
  windowSetDecorated window False

  -- Fullscreen requires a cooperating windowmanager.
  windowFullscreen window

  -- enable inspector
  webSettings <- webSettingsNew
  set webSettings [webSettingsEnableDeveloperExtras := True]

  -- Create WebKit view.
  webView <- webViewNew
  webViewSetWebSettings webView webSettings

  -- Load uri.
  webViewLoadUri webView url

  webView `on` createWebView $ \frame -> do
    newUri <- webFrameGetUri frame
    case newUri of
      Just uri -> webViewLoadUri webView uri
      Nothing  -> return ()
    return webView

  -- Connect and show.
  window `containerAdd` webView

  -- send USR1 to Helium to refresh the current page
  _handler <- installHandler sigUSR1 (Catch (webViewReload webView)) Nothing

  inspector <- get webView webViewInspector
  inspector `on` inspectWebView $ inspect

  window `onDestroy` mainQuit
  widgetShowAll window

  mainGUI


inspect page = do
  inspectorWindow <- windowNew
  windowSetDefaultSize inspectorWindow 700 700
  windowSetDecorated inspectorWindow True
  windowSetKeepAbove inspectorWindow True
  inspector <- get page webViewInspector
  insView <- webViewNew
  containerAdd inspectorWindow insView
  widgetShowAll inspectorWindow
  return insView